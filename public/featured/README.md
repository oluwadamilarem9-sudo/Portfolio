# Featured project images

Place your **project images** in this folder so they show in the **Featured Projects** section on the homepage.

## Step 1: Add image files here

Put your image files **inside this folder** (`public/featured/`) with these **exact** filenames (case-sensitive):

| Project                  | Filename              |
|--------------------------|------------------------|
| E-Commerce Platform      | `e-commerce.png`      |
| AI-Powered Dashboard     | `ai-dashboard.png`     |
| Social Network App       | `social-app.png`       |
| Task Management System   | `task-management.png`   |

**Formats:** PNG, JPG, or WebP  
**Recommended size:** About 16:9 (e.g. 800×450 or 1200×675).

## Step 2: Check the path

Your folder should look like this:

```
my-portfolio/
  public/
    featured/
      e-commerce.png      ← here
      ai-dashboard.png    ← here
      social-app.png      ← here
      task-management.png ← here
```

## Step 3: Restart dev server and refresh

1. Stop the dev server (Ctrl+C).
2. Run `npm run dev` again.
3. Hard-refresh the browser (Ctrl+Shift+R or Cmd+Shift+R).

If an image still doesn’t load, the app will show the colored gradient with the project initial instead.

## Using different names or locations

- **Different filenames:** Edit `src/data/portfolio.js` and set each project’s `image` to match, e.g. `image: "/featured/your-filename.png"`.
- **Image in another folder:** Use a path starting with `/`, e.g. `image: "/my-photos/project1.jpg"` (file must be inside `public/`).
