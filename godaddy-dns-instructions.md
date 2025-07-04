# GoDaddy DNS Configuration for kaizenburgos.com

## Current Status
I can see your GoDaddy DNS management panel. You need to add specific records to connect your domain to the website.

## DNS Records to Add/Modify

### Step 1: Delete Existing Records (if needed)
- Delete the existing CNAME record pointing to kaizenburgos.com
- Keep the NS records (nameservers) - DO NOT DELETE THESE

### Step 2: Add New DNS Records

**Record 1 - Root Domain:**
```
Type: A
Name: @
Value: 34.102.136.180
TTL: 1 Hour
```

**Record 2 - WWW Subdomain:**
```
Type: CNAME
Name: www
Value: [YOUR-REPLIT-PROJECT-NAME].replit.app
TTL: 1 Hour
```

### Step 3: How to Add Records in GoDaddy

1. **Add A Record:**
   - Click "Añadir" (Add) button
   - Select "A" from dropdown
   - Name: @ (this represents your root domain)
   - Value: 34.102.136.180
   - TTL: 1 Hora
   - Click "Guardar" (Save)

2. **Add CNAME Record:**
   - Click "Añadir" (Add) button again
   - Select "CNAME" from dropdown
   - Name: www
   - Value: [YOUR-REPLIT-PROJECT-NAME].replit.app
   - TTL: 1 Hora
   - Click "Guardar" (Save)

### Step 4: Find Your Replit Project Name
To get your exact Replit project name:
1. Go to your Replit project
2. Look at the URL or project name
3. It will be something like: kaizen-burgos.replit.app
4. Use the full name including .replit.app in the CNAME record

## Important Notes
- Keep all NS records (nameservers) - these are required
- You can delete the existing CNAME record that points to kaizenburgos.com
- DNS changes take 5-60 minutes to propagate
- The SOA and TXT records can stay as they are

## After DNS Setup
1. Go to your Replit project
2. Click "Deployments"
3. Add custom domain: kaizenburgos.com
4. Wait for SSL certificate (5-10 minutes)

## Verification
Test these URLs after 30 minutes:
- https://kaizenburgos.com
- https://www.kaizenburgos.com

Both should load your martial arts website with SSL (green padlock).