pipeline {
    agent any

    // Before running the jenkins pipeline make sure that:
    // 1) From jenkins vm with user jenkins you can
    // connect to the docker-server-app-02

    // 2) Change the VITE_BACKEND variable in frontend
    // repo to the ip of docker-server-app-02

    options {
        buildDiscarder(logRotator(numToKeepStr: '30', artifactNumToKeepStr: '30'))
    }

    environment {
        // EMAIL_TO = "tsaadimas@hua.gr"
        DOCKER_TOKEN = credentials('docker-push-secret')
        DOCKER_USER = 'it21773'
        DOCKER_SERVER = 'ghcr.io'
//         DOCKER_PREFIX = '$DOCKER_SERVER/$DOCKER_USER/ds-spring'
// ghcr.io/it21773/ds-spring
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'k8s', url: 'git@github.com:manosMakris/Dis_Sys_Exercise_Frontend.git'
            }
        }

        // stage('Change VITE_BACKEND in .env file') {
        //     steps {
        //         sh '''
        //             sed -i 's|^VITE_BACKEND=.*|VITE_BACKEND=http://vue-svc:9000|' .env
        //         '''
        //     }
        // }

        stage('Docker build and push') {
            steps {
                sh '''
                    HEAD_COMMIT=$(git rev-parse --short HEAD)
                    TAG=$HEAD_COMMIT-$BUILD_ID
                    docker build --rm -t $DOCKER_SERVER/$DOCKER_USER/ds-vue:$TAG -t $DOCKER_SERVER/$DOCKER_USER/ds-vue:latest -f Dockerfile .
                    echo $DOCKER_TOKEN | docker login $DOCKER_SERVER -u $DOCKER_USER --password-stdin
                    docker push $DOCKER_SERVER/$DOCKER_USER/ds-vue --all-tags
                '''
            }
        }

        stage('Make sure vue-deployment has been created') {
            steps {
                sh '''
                    kubectl apply -f /var/lib/jenkins/workspace/push-backend-image/k8s/vuejs/vue-deployment.yaml
                '''
            }
        }

        stage('set latest frontend image') {
            steps {
                sh '''
                    HEAD_COMMIT=$(git rev-parse --short HEAD)
                    TAG=$HEAD_COMMIT-$BUILD_ID
                    kubectl set image deployment/vue-deployment vue=$DOCKER_SERVER/$DOCKER_USER/ds-vue:$TAG
                    kubectl rollout status deployment vue-deployment --watch --timeout=2m
                '''
            }
        }
    }
}
