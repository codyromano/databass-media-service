
# Prereqs:
# docker, gcloud, kubectl

VERSION_LABEL=$1

docker build -t gcr.io/vital-191505/databass-media:$VERSION_LABEL .
gcloud docker -- push gcr.io/vital-191505/databass-media:$VERSION_LABEL
kubectl set image deployment/databass-media databass-media=gcr.io/vital-191505/databass-media:$VERSION_LABEL

echo "Last version deployed: $VERSION_LABEL" > last-version-deployed.txt