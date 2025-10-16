output "pages_project_url" {
  description = "URL of the Cloudflare Pages project"
  value       = "https://${cloudflare_pages_project.developing_apologist.subdomain}"
}

output "custom_domain_url" {
  description = "Custom domain URL for the Pages project"
  value       = "https://${var.custom_domain}"
}

output "project_name" {
  description = "Name of the created Pages project"
  value       = cloudflare_pages_project.developing_apologist.name
}

output "project_id" {
  description = "ID of the created Pages project"
  value       = cloudflare_pages_project.developing_apologist.id
}

output "dns_record_created" {
  description = "DNS CNAME record created for custom domain"
  value       = cloudflare_record.developingapologist_cname.hostname
}
