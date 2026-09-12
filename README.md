# Md. Meherab Hossen — academic portfolio

This portfolio is prepared for the GitHub account `meherabhossen3085-dotcom` and repository `meherabhossen3085-dotcom.github.io`.

The intended website address is https://meherabhossen3085-dotcom.github.io/ after GitHub Pages is enabled and deployment succeeds. This package has not been published by Codex.

## 1. Create the repository

On the “Create a new repository” screen, use these settings:

| Setting | Value |
| --- | --- |
| Owner | `meherabhossen3085-dotcom` |
| Repository name | `meherabhossen3085-dotcom.github.io` |
| Description | Academic portfolio of Md. Meherab Hossen — CFD, heat transfer and thermal sciences. |
| Visibility | Public |
| Add README | On |
| Add .gitignore | No .gitignore |
| Add license | No license |

Click **Create repository**. The repository name must match your username followed by `.github.io` for the website to use the address above. [GitHub Pages quickstart](https://docs.github.com/en/pages/quickstart)

## 2. Upload the website files

1. Download `portfolio-new-account.zip` and extract it on your computer.
2. Open the extracted `portfolio-new-account` folder. You should see `index.html`, `assets`, `README.md` and `.nojekyll`.
3. In your new GitHub repository, click **Add file → Upload files**.
4. Drag those four items from inside the extracted folder into the upload area. Keep the entire `assets` folder intact.
5. Use **Add academic portfolio website** as the commit message, choose to commit directly to `main` if offered, and click **Commit changes**. If GitHub offers only **Propose changes**, complete the resulting pull request into `main` before the next step.

Upload the extracted contents. Uploading the ZIP itself will not create the website. `index.html` needs to be at the top level of the repository, rather than inside a second `portfolio-new-account` folder. GitHub supports dragging folders into the upload area. [GitHub upload instructions](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)

The repository should have this structure:

```text
meherabhossen3085-dotcom.github.io/
├── index.html
├── .nojekyll
├── README.md
└── assets/
    ├── css/style.css
    ├── js/main.js
    ├── img/       (portraits, plots, certificates and photos)
    └── files/     (CV and six project reports)
```

If `.nojekyll` is not visible after extraction, create it on GitHub with **Add file → Create new file**, name it `.nojekyll`, and commit it. It tells GitHub to publish the supplied static files without Jekyll processing.

## 3. Enable GitHub Pages

1. Open the repository’s **Settings** tab.
2. Select **Pages** in the left sidebar.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Select branch **main** and folder **/ (root)**.
5. Click **Save**.

These are the branch-publishing settings documented by GitHub. Keep the custom-domain field empty for this `github.io` address. If publication does not begin, make sure your new account’s email is verified. [Publishing-source instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## 4. Open the finished website

After deployment completes, visit:

**https://meherabhossen3085-dotcom.github.io/**

GitHub says publication can take up to 10 minutes after changes are pushed. Check the **Actions** tab if deployment fails. [GitHub Pages quickstart](https://docs.github.com/en/pages/quickstart)

Check Home, Research and its reference links, the CV button, project reports, and the mobile menu.

## Public email and account email

The email you use to sign in to GitHub and the contact email shown on the website can be different. This package still shows:

- Personal contact: `meherabhossen3085@gmail.com`
- Work contact: `Meherab.Hossen@MACPROTECENG.com`
 another link https://cfdmeherabhossen.github.io/meherabhossen/
To change the public personal contact address, edit `index.html` and replace every occurrence of `meherabhossen3085@gmail.com` with the address you want visitors to use. There are three occurrences: the visible address, its email link, and the research-enquiry button. Keep the work address unless you also intend to change it. Review the CV separately if its contact details need updating.

## What is already prepared

- Website and social-preview URLs use the new GitHub account.
- All images, reports, styles and scripts are included with relative paths.
- The site identifies you as a Mechanical Engineering graduate.
- The research-focused layout, working citations and mobile improvements are included.
- No Node.js installation or build command is needed to publish this static website.

Your existing portfolio can remain on the old account. This package is intended for the new repository.

## Troubleshooting

- **404 page:** confirm the repository name, verify that `index.html` is at its top level, and check Pages uses `main` and `/ (root)`.
- **Only the README appears:** check the location and exact filename of `index.html`.
- **Pictures or styling missing:** upload the full `assets` folder and preserve filename capitalization, including `profile.JPG`.
- **Old version still visible:** wait for the latest deployment to finish, then refresh with Ctrl+F5.
- **Report or CV missing:** verify the corresponding PDF exists in `assets/files/`.
