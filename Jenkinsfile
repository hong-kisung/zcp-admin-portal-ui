@Library('retort-lib') _
def label = "jenkins-${UUID.randomUUID().toString()}"

def ZCP_USERID='cloudzcp-admin'
def DOCKER_IMAGE='cloudzcp/zcp-estimate-ui'
def K8S_NAMESPACE='default'

podTemplate(label:label,
    serviceAccount: "zcp-system-sa-${ZCP_USERID}",
    containers: [
        containerTemplate(name: 'maven', image: 'maven:3.5.2-jdk-8-alpine', ttyEnabled: true, command: 'cat'),
        containerTemplate(name: 'docker', image: 'docker', ttyEnabled: true, command: 'cat'),
        containerTemplate(name: 'kubectl', image: 'lachlanevenson/k8s-kubectl', ttyEnabled: true, command: 'cat')
    ],
    volumes: [
        hostPathVolume(hostPath: '/var/run/docker.sock', mountPath: '/var/run/docker.sock'),
        persistentVolumeClaim(mountPath: '/root/.m2', claimName: 'zcp-jenkins-mvn-repo')
    ]) {

    node(label) {
        stage('SOURCE CHECKOUT') {
            def repo = checkout scm
            env.SCM_INFO = repo.inspect()
        }
        
        stage('Information') {
          steps {
            sh 'node -v'
            sh 'npm -v'
          }
        }
        stage('Config') {
          steps {
            sh 'npm set registry https://registry.npm.taobao.org'
            sh 'npm set disturl https://npm.taobao.org/dist'
            sh 'npm set chromedriver_cdnurl http://cdn.npm.taobao.org/dist/chromedriver'
            sh 'npm set operadriver_cdnurl http://cdn.npm.taobao.org/dist/operadriver'
            sh 'npm set phantomjs_cdnurl http://cdn.npm.taobao.org/dist/phantomjs'
            sh 'npm set fse_binary_host_mirror https://npm.taobao.org/mirrors/fsevents'
            sh 'npm set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass'
            sh 'npm set electron_mirror http://cdn.npm.taobao.org/dist/electron/'
          }
        }
        stage('Dependencies') {
          steps {
            sh 'npm install'
          }
        }

        /*stage('BUILD') {
            container('maven') {
                mavenBuild goal: 'clean package', systemProperties:['maven.repo.local':"/root/.m2/${JOB_NAME}"]
            }
        }*/
        
        stage('Build') {
          steps {
            sh 'npm run build'
          }
        }
        stage('Artifacts') {
          steps {
            sh 'tar -czf dist.tar.gz ./dist'
            stash 'dist.tar.gz'
            stash 'Dockerfile'
            stash 'nginx.conf'
            archiveArtifacts artifacts: 'dist.tar.gz', fingerprint: true
          }
        }

        stage('BUILD DOCKER IMAGE') {
            container('docker') {
                dockerCmd.build tag: "${HARBOR_REGISTRY}/${DOCKER_IMAGE}:${BUILD_NUMBER}"
                dockerCmd.push registry: HARBOR_REGISTRY, imageName: DOCKER_IMAGE, imageVersion: BUILD_NUMBER, credentialsId: "HARBOR_CREDENTIALS"
            }
        }

        stage('DEPLOY') {
            container('kubectl') {
                kubeCmd.apply file: 'k8s/zcp-estimate-ui-service.yaml', namespace: K8S_NAMESPACE
                yaml.update file: 'k8s/zcp-estimate-ui-deployment.yaml', update: ['.spec.template.spec.containers[0].image': "${HARBOR_REGISTRY}/${DOCKER_IMAGE}:${BUILD_NUMBER}"]

                kubeCmd.apply file: 'zcp-estimate-ui-deployment.yaml', wait: 300, recoverOnFail: false, namespace: K8S_NAMESPACE
            }
        }
    }
}
