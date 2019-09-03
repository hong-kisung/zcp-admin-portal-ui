@Library('retort-lib') _
def label = "jenkins-${UUID.randomUUID().toString()}"

def ZCP_USERID='cloudzcp-admin'
def DOCKER_IMAGE='cloudzcp/zcp-admin-portal-ui'
def K8S_NAMESPACE='zcp-admin'
def VERSION='develop'

podTemplate(label:label,
    serviceAccount: "zcp-system-admin",
    containers: [
        containerTemplate(name: 'maven', image: 'maven:3.5.2-jdk-8-alpine', ttyEnabled: true, command: 'cat'),
        containerTemplate(name: 'node', image: 'node', ttyEnabled: true, command: 'cat'),
        containerTemplate(name: 'docker', image: 'docker:17-dind', ttyEnabled: true, command: 'dockerd-entrypoint.sh', privileged: true),
        containerTemplate(name: 'kubectl', image: 'lachlanevenson/k8s-kubectl', ttyEnabled: true, command: 'cat')
    ],
    volumes: [
        persistentVolumeClaim(mountPath: '/root/.m2', claimName: 'zcp-jenkins-mvn-repo')
    ]) {

    node(label) {
        stage('SOURCE CHECKOUT') {
            def repo = checkout scm
            env.SCM_INFO = repo.inspect()
        }
        
        stage('BUILD') {
            container('node') {
                sh 'npm install'
                sh 'node -v'
                sh 'npm -v'
                sh 'npm run build'
            }
        }
        
        stage('BUILD DOCKER IMAGE') {
            container('docker') {
                dockerCmd.build tag: "${DOCKER_IMAGE}:${VERSION}"
                dockerCmd.push imageName: DOCKER_IMAGE, imageVersion: VERSION, credentialsId: "dockerhub"
            }
        }

        stage('DEPLOY') {
            container('kubectl') {
                kubeCmd.apply file: 'k8s/zcp-admin-portal-ui-service.yaml', namespace: K8S_NAMESPACE
                
                yaml.update file: 'k8s/zcp-admin-portal-ui-deployment.yaml', update: ['.spec.template.spec.containers[0].image': "${DOCKER_IMAGE}:${VERSION}"]
                kubeCmd.apply file: 'k8s/zcp-admin-portal-ui-deployment.yaml', wait: 1000, recoverOnFail: false, namespace: K8S_NAMESPACE
                 
                kubeCmd.scale file: 'k8s/zcp-admin-portal-ui-deployment.yaml', replicas: 0, namespace: K8S_NAMESPACE
                kubeCmd.scale file: 'k8s/zcp-admin-portal-ui-deployment.yaml', replicas: 1, namespace: K8S_NAMESPACE
            }
        }
    }
}
