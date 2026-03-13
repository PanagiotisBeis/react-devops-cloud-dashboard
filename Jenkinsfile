pipeline {
    agent any

    stages {
        stage('Install dependencies') {
            agent {
                docker{
                    image: '25.8.1-alpine'
                    reuseNode true
                }
            }
            steps {
                sh 'npm ci'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying test....'
            }
        }
    }
}