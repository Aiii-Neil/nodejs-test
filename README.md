# API Template For GKE

## serivce

Prod:

- https://pay.aiii.ai (managed-cert-ingress => 34.117.172.163)
- https://internal-api.aiii.ai (internal-ingress => 34.117.67.64)
- https://partner-api.aiii.ai (partner-api-ingress => 34.117.97.164)

Stage:

- https://stage-pay.aiii.ai (managed-cert-ingress => 34.120.26.163)
- https://stage-internal-api.aiii.ai (internal-ingress =>
  34.111.235.9)
- https://stage-partner-api.aiii.ai (partner-api-ingress =>
  34.117.83.28)

# Repo

本為 template repo
請用 github 上的 `Use this template` 按鈕來複製使用

## 首次設定 Check List

修改 package.json 內的

- [ ] `name`
- [ ] `version`
- [ ] `description`
- [ ] `config.stageImage`
- [ ] `config.prodImage`
- [ ] `repository.url`

修改 yaml

- [ ] 修改 .kube 目錄中 stage-deployment.yaml 與 prod-deployment.yaml 的 template-api-gke 名稱
- [ ] 修改 .cloudbuild 目錄中 stage-cloudbuild.yaml 與 prod-cloudbuild.yaml 中 \_SERVICE_NAME 的 template-api-gke 名稱
- [ ] 修改 .github 目錄中的 gke-pull-request.yml 與 gke-push-version-tag.yml 內的 `DEPLOYMENT_NAME` 的 template-api-gke 名稱

首次 gcloud config 設定

```sh
gcloud config configurations activate [設定檔名稱]
gcloud config set container/use_application_default_credentials true
gcloud config set artifacts/location asia-east1
gcloud config set artifacts/repository develop
gcloud auth configure-docker asia-east1-docker.pkg.dev
```

#### 本機測試

```sh
npm ci

#每次開啟終端機的時候都需要先執行secrets/secret.sh，以取得環境變數
source secrets/secret.sh

gcloud config set project aiii-developer && gcloud auth application-default login

npm run serve
```

### 切換 Cluster

開發測試版

```sh
gcloud container clusters get-credentials dev-cluster --region asia-east1 --project aiii-developer
```

列出所有已取得權限 Cluster

```
kubectl config get-contexts
```

如已取得過權限，直接切換

```
kubectl config use-context gke_aiii-developer_asia-east1_dev-cluster
```

### 開始部署至測試環境

- 建立 image 到本機 Docker

```sh
npm run docker:build
```

- 本地執行 Docker 測試，在執行前，可以先檢查 Dockerfile 是否有 secret.sh 的環境變數

```sh
npm run docker:run
```

- Push 到 GCP Artifact Registry

```sh
npm run docker:push
```

- 部署 GKE

```sh
npm run deploy:gke
```

### 自動部署流程 (擇一使用)
- [Cloud Build] 
  - 修改 prod-cloudbuild.yaml 與 stage-cloudbuild.yaml 中的`substitutions:_SERVICE_NAME:`
  - stage-deployment 的版本好需要用`s`作為開頭，例如`s1.0.1`
  - prod-deployment 的版本好需要用`v`作為開頭，例如`v1.0.1`
  - PR 合併完成後，在 main 或 master 支線下 tag 即可(相關可以參考 gke 部署教學)

- [GitHub Action]
  - 不需手動修改 deployment yaml 中的 image 版號，任意更動有可能無法正常部署
  - 當有`新的 commit push 至 PR 時`，會自動觸發部署至`測試環境` (default project: aiii-developer)
  - 當有`新的 tag (v*) commit` 時，會自動觸發部署至`正式環境` (default project: aiii-core)

### 退版流程
- 先切換至對應的 clusters `kebuctl config use-context {{contextName}}`
- 查詢歷史版本檢視版號 `kubectl rollout history deployment {{deploymentName}}`
- 回復至指定版本 `kubectl rollout undo deployment {{deploymentName}} --to-revision={{revision}}`
