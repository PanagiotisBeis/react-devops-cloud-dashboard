pipeline {
    agent any

    environment {
        REACT_APP_VERSION = "1.0.$BUILD_ID"
        AWS_DEFAULT_REGION = 'eu-central-1'
        APP_NAME = 'react-devops-cloud-dashboard'
        AWS_DOCKER_REGISTRY = ''
        AWS_ECS_CLUSTER = ''
        AWS_ECS_SERVICE_PROD = ''
        AWS_ECS_TD_PROD  = ''
        DOCKER_API_VERSION = '1.44'
    }

    stages {
        stage('Install & build ') {
            agent {
                docker{
                    image 'node:25.8.1-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    npm ci
                    npm run build
                '''
            }
        }

        stage('Build and Push to ECR') {
            agent {
                docker{
                    image 'amazon/aws-cli'
                    reuseNode true
                    args "-u root -v /var/run/docker.sock:/var/run/docker.sock --entrypoint=''"
                }
            }
            steps {
               echo 'push'
            }
        }
    }
}