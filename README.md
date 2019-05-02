![](https://www.politico.com/interactives/cdn/images/badge.svg)

# template_lambda-bakery

This is a [POLITICO interactive templates](https://github.com/The-Politico/politico-interactive-templates) to create an AWS Lambda backed static page bakery.

### Why this?

At POLITICO, we have one commandment: Always bake public pages to flat files stored on AWS S3.

Sometimes, we need to rebake the pages at a fast clip for live coverage like elections or in response to a change in a data source, like a database updated by our newsroom. We've also committed to component-based page architecture and server-side rendering those components to create fast, SEO-friendly pages.

This template represents a design pattern for creating a severless "bakery" that acts as a microservice for building static, server-side rendered pages on demand from dynamic data sources.

### What's in it?

The template includes a deployment package for creating a bakery microservice backed by AWS Lambda and API Gateway. It also includes scripts to build a pipeline for continuous integration with a GitHub repository.

Finally, the template builds out the basic infrastructure to host both your Lambda function as well as the frontend assets of your page.


## Quickstart

1. Install the template using [POLITICO interactive templates](https://github.com/The-Politico/politico-interactive-templates).

  ```
  $ pit register https://github.com/The-Politico/template_lambda-bakery
  ```

2. Use PIT to create a new project from this template.

  ```
  $ mkdir new-project
  $ cd new-project
  $ pit new
  ```

3. Follow the guide in the created README to build out your project from the template.
