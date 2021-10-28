hexo.extend.filter.register('before_post_render', function (data) {

  data.cover && (data.index_img = data.cover);
  return data;
});