pipeline {
    agent any

    environment {
        // Define the image name
        IMAGE_NAME = "business-homepage"
        // DockerHub credentials ID (you need to configure this in Jenkins)
        DOCKERHUB_CREDENTIALS = 'dockerhub_credentials'
    }

    stages {

        stage('Clone Repository') {
            steps {
                // Clone the repository containing your HTML/CSS and Dockerfile
                git url: 'https://github.com/johnzama/todo-app-project.git', branch: 'main'
            }
        }

        stage('Build Docker Image') {
            steps {
                // Build the Docker image from the Dockerfile
                script {
                    docker.build(IMAGE_NAME)
                }
            }
        }

        stage('Test Docker Image') {
            steps {
                // Run the container to test if it's running correctly
                script {
                    docker.image(IMAGE_NAME).inside {
                        // Test against the correct port 8029
                        sh 'curl -I http://localhost:8029'
                    }
                }
            }
        }

        /*
        stage('Push Docker Image to DockerHub') {
            steps {
                script {
                    // Log in to DockerHub and push the image
                    docker.withRegistry('https://index.docker.io/v1/', DOCKERHUB_CREDENTIALS) {
                        docker.image(IMAGE_NAME).push('latest')
                    }
                }
            }
        }
        */

        stage('Deploy') {
            steps {
                script {
                    // Run the Docker container on port 8029
                    sh 'docker run -d -p 8029:80 --name todo-app-container business-homepage'
                }
            }
        }
    }

    post {
        always {
            // Clean up any leftover Docker images or containers after the pipeline completes
            cleanWs()
        }
    }
}
