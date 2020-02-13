const variant = {
	methods: {
		cloudImageUrl: function(cloud) {
		    let variantUrl
		    
		    if(cloud == 'GCP') {
		        variantUrl = 'img/img_logo_gcs.png'
		    }else if(cloud == 'AWS') {
		        variantUrl = 'img/img_logo_aws.png'
		    }else if(cloud == 'CLOUDZ') {
		        variantUrl = 'img/img_logo_cloud.png'
		    }else if(cloud == 'IBM') {
		        variantUrl = 'img/img_logo_ibm.png'
		    }else if(cloud == 'AZURE') {
		        variantUrl = 'img/img_logo_azure.png'
		    }
		    return variantUrl
		},
		cloudImageAlt: function(cloud) {
		    let variantAlt
		    
		    if(cloud == 'GCP') {
		        variantAlt = 'Google Clould System Logo'
		    }else if(cloud == 'AWS') {
		        variantAlt = 'Amazon Web System Logo'
		    }else if(cloud == 'CLOUDZ') {
		        variantAlt = 'Cloud Z Logo'
		    }else if(cloud == 'IBM') {
		        variantAlt = 'IBM Logo'
		    }else if(cloud == 'AZURE') {
		        variantAlt = 'Azure Logo'
		    }
		    return variantAlt
		},
        projectStatus: function (status) {
            let variant
            
            if(status == 'Operation') {
                variant = 'success'
            }else if(status == 'Proposal') {
                variant = 'warning'
            }else if(status == 'Development') {
                variant = 'primary'
            }
            return variant
        }
	}	
}

export default variant
