# EAS Build Setup for iOS TestFlight

## Prerequisites
1. Apple Developer Account ($99/year)
2. Expo account (free)
3. EAS CLI installed globally

## Setup Complete ✅

### 1. EAS CLI Installed
```bash
npm install -g eas-cli
```

### 2. Configuration Files Created
- `eas.json` - EAS build configuration with development, preview, and production profiles
- `app.json` - Updated with iOS bundle identifier and build settings
- `credentials.json` - Template for iOS certificates (gitignored)

### 3. Build Scripts Added to package.json
```bash
# Development build
bun run build:ios

# Preview build (internal testing)
bun run build:ios:preview  

# Production build (TestFlight/App Store)
bun run build:ios:production

# Submit to TestFlight
bun run submit:ios

# Submit latest build to TestFlight
bun run submit:ios:production
```

## Next Steps

### 1. Login to EAS
```bash
eas login
```

### 2. Link Project to EAS
```bash
eas init --id your-project-id
```
This will create a project on Expo's servers and update the projectId in app.json

### 3. Configure Apple Credentials

#### Option A: Let EAS Handle Everything (Recommended)
```bash
eas credentials
```
EAS will guide you through:
- Creating an App Store Connect API Key
- Creating certificates and provisioning profiles
- Storing them securely

#### Option B: Manual Setup
1. Create certificates and provisioning profiles in Apple Developer Portal
2. Update `credentials.json` with paths to your files
3. Use `--local` flag when building

### 4. Build for TestFlight
```bash
# This will create a production build ready for TestFlight
bun run build:ios:production
```

### 5. Submit to TestFlight
```bash
# After build completes
bun run submit:ios:production
```

## Important Notes

1. **First Build**: The first build will take longer as EAS sets up your project
2. **Apple Credentials**: EAS can manage these for you or you can provide your own
3. **Build Limits**: Free tier includes 30 builds/month
4. **Build Time**: iOS builds typically take 15-30 minutes
5. **Auto-increment**: Production builds auto-increment the build number

## Troubleshooting

### Missing Apple Team ID
Update `eas.json` with your Apple Team ID from Apple Developer Portal

### Build Fails
- Check that bundle identifier matches Apple Developer Portal
- Ensure provisioning profile includes all required capabilities
- Verify certificates haven't expired

### Submission Fails
- Ensure App Store Connect has the app created
- Check that version number hasn't been used before
- Verify Apple ID and Team ID in eas.json

## Resources
- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [Submitting to App Stores](https://docs.expo.dev/submit/introduction/)
- [iOS Credentials Guide](https://docs.expo.dev/app-signing/managed-credentials/)