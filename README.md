![](https://www.politico.com/interactives/cdn/images/badge.svg)

# template_lambda-bakery

This is a [POLITICO interactive template](https://github.com/The-Politico/politico-interactive-templates) to create an AWS Lambda-backed static page bakery.

### Why this?

At POLITICO, we have one commandment: Always bake public pages to flat files stored on AWS S3.

Sometimes, we need to rebake the pages at a fast clip for live coverage like elections or in response to a change in a data source, like a database updated by our newsroom. We've also committed to component-based page architecture and use server-side rendering to create fast, SEO-friendly pages.

This template represents a design pattern for creating a severless "bakery" that acts as a microservice for building static, server-side rendered pages on demand from dynamic data sources.

Say you have a process -- whatever process, any process! -- that on completion should trigger a page rebake. With this structure, your process can hit a simple public API triggering a serverless function that rebakes the page with new data.

Using serverless architecture means page rebakes can scale to whatever size you need at the absolute minimum cost. It also means you don't ever need to worry about server availability or balance the cost of rebaking complex pages with processing the data behind them.

### What's in it?

The template includes an [AWS CloudFormation](https://aws.amazon.com/cloudformation/) template for creating a bakery microservice backed by AWS Lambda and API Gateway. It also includes [Terraform](https://www.terraform.io/) scripts to build a pipeline for continuous integration with a GitHub repository.

The template contains boilerplate for both your Lambda bakery as well as the frontend assets of your page, meaning you can easily share the same project between developers and designers.

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
