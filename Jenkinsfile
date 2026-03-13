pipeline {
    agent any

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

        stage('Deploy') {
            steps {
                echo 'Deploying test....'
            }
        }
    }
}