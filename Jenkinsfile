pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Clones the repository
                git url: 'https://github.com/your-username/your-repository.git', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Installs project dependencies
                sh 'npm install'
            }
        }

        stage('Run Application') {
            steps {
                // Runs the application
                sh 'npm start'
            }
        }
    }

    post {
        success {
            echo 'Build succeeded!'
        }
        failure {
            echo 'Build failed. Please check the logs.'
        }
    }
}
