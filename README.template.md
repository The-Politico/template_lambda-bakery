![](https://www.politico.com/interactives/cdn/images/badge.svg)

# <%=github_repo%>

### Deploying infrastructure

##### Pre-requisites

You should have your AWS credentials in `~/.aws/credentials`. Be sure you're using the profile you specified when creating this repo.

The pipeline will also need access to a GitHub personal access token that has access to your repository. You can add it to `terraform/config/config.tfvars.secret`. Alternatively, clear out the `github_token` key in that file and export a `TF_VAR_github_token` environment variable.

##### Building your pipeline

```
$ make build
```

##### Tearing down

```
$ make destroy
```
