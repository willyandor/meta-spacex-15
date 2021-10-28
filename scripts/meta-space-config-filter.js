const fs = require('hexo-fs');
const { deepMerge } = require('hexo-util');
const path = require('path');

// eslint-disable-next-line no-undef
hexo.extend.filter.register('after_init', async function () {
  const { base_dir, render } = this;

  const metaConfigPath = path.join(base_dir, 'meta-space-config.yml');
  const isExists = await fs.exists(metaConfigPath);
  if (!isExists) return;

  const metaConfig = await render.render({ path: metaConfigPath });
  const { user, site } = metaConfig;
  let fluidConfig = {};

  if (site && user) {
    fluidConfig = {
      navbar: {
        blog_title: site.title,
      },
      about: {
        subtitle: site.subtitle,
        avatar: site.avatar,
        name: user.nickname || user.username || site.author,
        intro: site.description,
      },
    }
  }

  this.config.theme_config = deepMerge(this.config.theme_config, fluidConfig);
});
