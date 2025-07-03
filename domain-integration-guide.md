# GoDaddy Domain Integration Guide for Kaizen Burgos

## Step 1: Purchase Domain on GoDaddy

### Your Domain:
- **kaizenburgos.com** ✅ **PURCHASED**

### Purchase Process:
1. Go to [GoDaddy.com](https://godaddy.com)
2. Search for your chosen domain name
3. Add to cart and complete purchase
4. Choose 1-2 year registration initially

## Step 2: Configure DNS Settings in GoDaddy

### Access DNS Management:
1. Login to your GoDaddy account
2. Go to "My Products" → "Domains"
3. Click "DNS" next to your domain name

### DNS Records to Add:

#### For Replit Deployment:
**IMPORTANT: Replace "your-repl-name" with your actual Replit project name**

```
Type: CNAME
Name: www
Value: your-repl-name.replit.app
TTL: 1 Hour

Type: A
Name: @
Value: 34.102.136.180
TTL: 1 Hour
```

**Next Steps:**
1. In GoDaddy DNS management, add these records
2. In Replit, go to your project → Deployments → Add Custom Domain
3. Enter: kaizenburgos.com
4. Wait for SSL certificate (5-10 minutes)

#### For Email (Optional):
```
Type: MX
Name: @
Value: mx1.godaddy.com
Priority: 10
TTL: 1 Hour

Type: MX
Name: @
Value: mx2.godaddy.com
Priority: 20
TTL: 1 Hour
```

## Step 3: Configure Replit for Custom Domain

### In Replit:
1. Go to your project settings
2. Click on "Deployments" tab
3. Add custom domain
4. Enter your domain name (e.g., kaizenburgos.com)
5. Follow Replit's SSL certificate setup

### SSL Certificate:
- Replit automatically provides SSL certificates
- Wait 5-10 minutes for propagation
- Your site will be accessible via HTTPS

## Step 4: Update Website Configuration

### SEO Updates Needed:
1. Update sitemap.xml with new domain
2. Update Open Graph URLs
3. Update canonical URLs
4. Update Google Search Console
5. Update Google Analytics (if added)

### Contact Information Updates:
- Update email addresses to use custom domain
- Update social media bio links
- Update business cards/marketing materials

## Step 5: DNS Propagation & Testing

### Timeline:
- **Immediate**: Changes visible in some locations
- **1-4 hours**: Most locations updated
- **24-48 hours**: Complete global propagation

### Testing Tools:
- [DNS Checker](https://dnschecker.org)
- [What's My DNS](https://whatsmydns.net)
- Browser incognito mode for fresh DNS lookup

## Step 6: Post-Launch Optimization

### SEO Actions:
1. Submit new domain to Google Search Console
2. Set up 301 redirects from Replit subdomain
3. Update local business listings (Google My Business)
4. Update social media profiles with new domain

### Monitoring:
- Check domain loading speed
- Verify SSL certificate validity
- Monitor for any DNS issues
- Test mobile responsiveness on new domain

## Common Issues & Solutions

### Domain Not Loading:
- Check DNS propagation status
- Verify CNAME/A records are correct
- Clear browser cache and DNS cache
- Wait for full 48-hour propagation

### SSL Certificate Issues:
- Ensure HTTPS is enforced in Replit
- Check certificate validity
- Contact Replit support if needed

### Email Setup (Optional):
- Consider Google Workspace for professional emails
- Set up info@yourdomain.com for business inquiries
- Configure email forwarding in GoDaddy

## Cost Breakdown (Approximate):
- **Domain Registration**: $10-15/year
- **SSL Certificate**: Free (included with Replit)
- **Email Hosting**: $6/month (Google Workspace, optional)
- **Total First Year**: $10-15 + optional email costs

## Next Steps After Domain is Live:
1. Update all marketing materials
2. Notify existing customers of new domain
3. Set up Google Analytics with new domain
4. Consider Google Ads for local martial arts searches
5. Update gym's social media profiles

---

**Need Help?** Contact Replit support for deployment issues or GoDaddy support for DNS problems.