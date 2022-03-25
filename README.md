# Linear Productboard Integration

## Usage

- Go to the Productboard feature that you wish to link to a Linear project
- Copy the `API Id` field to your clipboard
- Paste that value into the `description` of the Linear Project
- Done!

Now all actions related to that project or its issues will update the progress in the Productboard features description

## Getting Started

**Development**  
`npm run dev` boots the app on localhost:3000

**Production**

The application runs on the base URL - `https://linear-productboard-api.vercel.app/`.

**Routes**  
All API routes are found under the `/api` subdirectory, e.g. `https://linear-productboard-api.vercel.app/api/healthz`

**Adding Routes**

**Deploying Changes**
Pushing the changes to the `main` branch will automatically deploy them to production.  
Please ensure to **test your build** before pushing changes.

- ie. `npm run build` exits with code 0

**Health**

- `https://linear-productboard-api.vercel.app/api/healthz` to check production service health
