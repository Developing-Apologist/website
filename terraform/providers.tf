terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 3.0"
    }
  }

  required_version = ">= 1.0"
  
  cloud {
    organization = "developing-apologist"
    workspaces {
      name = "website-prod"
    }
  }
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}
