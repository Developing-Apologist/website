# Cloudflare Pages Terraform Configuration

This Terraform configuration deploys the Developing Apologist website to Cloudflare Pages with future Firebase integration support.

## Prerequisites

1. **Cloudflare Account**: You need a Cloudflare account with the domain `developingapologist.com` added
2. **API Token**: Create a Cloudflare API token with the following permissions:
   - Zone:Read
   - Zone:Edit
   - Account:Cloudflare Pages:Edit
3. **GitHub Repository**: The repository must be accessible to Cloudflare

## Configuration Details

- **Project Name**: `developing-apologist`
- **GitHub Repository**: `developing-apologist/website`
- **Build Command**: `npm run build`
- **Output Directory**: `_site`
- **Custom Domain**: `developingapologist.com`
- **Production Branch**: `main`

## Setup

1. **Copy the example variables file:**
   ```bash
   cp terraform.tfvars.example terraform.tfvars
   ```

2. **Edit terraform.tfvars with your values:**
   - `cloudflare_api_token`: Your Cloudflare API token
   - `cloudflare_account_id`: Your Cloudflare account ID (found in the dashboard sidebar)

3. **Initialize Terraform:**
   ```bash
   terraform init
   ```

4. **Plan the deployment:**
   ```bash
   terraform plan
   ```

5. **Apply the configuration:**
   ```bash
   terraform apply
   ```

## What This Configuration Does

- Creates a Cloudflare Pages project connected to your GitHub repository
- Sets up build configuration for Eleventy static site generation
- Creates DNS records for the custom domain
- Prepares environment variables for future Firebase integration
- Enables preview deployments for all branches

## Firebase Integration (Future)

The configuration includes environment variables for Firebase integration:
- `FIREBASE_API_KEY`: Firebase API key (stored as secret)
- `FIREBASE_AUTH_DOMAIN`: Firebase authentication domain
- `FIREBASE_PROJECT_ID`: Firebase project ID

These variables are available in both production and preview deployments.

## Outputs

After successful deployment, you'll get:
- Pages project URL (subdomain)
- Custom domain URL
- Project name and ID
- DNS record information

## GitHub Integration

The configuration automatically connects to the GitHub repository. Make sure:
1. The repository is accessible to Cloudflare
2. The repository contains the website source code
3. The main branch contains the code you want to deploy
