# Get the zone for the custom domain
data "cloudflare_zone" "developingapologist" {
  name = "developingapologist.com"
}

# Cloudflare Pages project for Developing Apologist website
resource "cloudflare_pages_project" "developing_apologist" {
  account_id = var.cloudflare_account_id
  name       = "developing-apologist"
  
  production_branch = "main"
  
  # Build configuration for Eleventy static site
  build_config = {
    build_caching    = true
    build_command    = "npm run build"
    destination_dir  = "_site"
    root_dir         = "/"
  }
  
  # GitHub source configuration
  source = {
    type = "github"
    config = {
      owner                        = "developing-apologist"
      repo_name                   = "website"
      production_branch          = "main"
      deployments_enabled         = true
      production_deployments_enabled = true
      pr_comments_enabled         = true
      preview_deployment_setting  = "all"
    }
  }
  
  # Environment variables for Firebase integration (future use)
  deployment_configs = {
    production = {
      env_vars = {
        # Site configuration
        NODE_ENV = {
          type  = "plain_text"
          value = "production"
        }
      }
    }
    preview = {
      env_vars = {
        # Site configuration
        NODE_ENV = {
          type  = "plain_text"
          value = "development"
        }
      }
    }
  }
}
# CNAME record for the custom domain
resource "cloudflare_record" "developingapologist_cname" {
  zone_id = data.cloudflare_zone.developingapologist.zone_id
  name    = "developingapologist.com"
  content = cloudflare_pages_project.developing_apologist.subdomain
  type    = "CNAME"
  ttl     = 1
  proxied = true
}

