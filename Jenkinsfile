pipeline {
    agent any

    environment {
        REACT_APP_VERSION = "1.0.$BUILD_ID"
        AWS_DEFAULT_REGION = 'eu-central-1'
        APP_NAME = 'react-devops-cloud-dashboard'
        AWS_DOCKER_REGISTRY = '002574138182.dkr.ecr.eu-central-1.amazonaws.com'
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
                withCredentials([usernamePassword(credentialsId: 'my-aws', passwordVariable: 'AWS_SECRET_ACCESS_KEY', usernameVariable: 'AWS_ACCESS_KEY_ID')]){
                    sh '''
                        docker build -t $AWS_DOCKER_REGISTRY/$APP_NAME:$REACT_APP_VERSION .
                        aws ecr get-login-password | docker login --username AWS --password-stdin $AWS_DOCKER_REGISTRY
                        docker push $AWS_DOCKER_REGISTRY/$APP_NAME:$REACT_APP_VERSION
                    '''
                }               
            }
        }
    }
}