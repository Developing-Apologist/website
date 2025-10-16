variable "cloudflare_api_token" {
  description = "Cloudflare API token for authentication"
  type        = string
  sensitive   = true
}

variable "cloudflare_account_id" {
  description = "Cloudflare account ID"
  type        = string
}

variable "github_repository" {
  description = "GitHub repository in format owner/repo"
  type        = string
  default     = "developing-apologist/website"
}

variable "project_name" {
  description = "Name of the Cloudflare Pages project"
  type        = string
  default     = "developing-apologist"
}

variable "custom_domain" {
  description = "Custom domain for the Pages project"
  type        = string
  default     = "developingapologist.com"
}

# Firebase configuration variables (for future integration)
# These can be added when Firebase integration is needed
# variable "firebase_api_key" {
#   description = "Firebase API key for authentication"
#   type        = string
#   sensitive   = true
#   default     = ""
# }
# 
# variable "firebase_auth_domain" {
#   description = "Firebase authentication domain"
#   type        = string
#   default     = ""
# }
# 
# variable "firebase_project_id" {
#   description = "Firebase project ID"
#   type        = string
#   default     = ""
# }
