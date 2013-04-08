hljs.tabReplace = '    ';
hljs.initHighlightingOnLoad();

$(function() {
  // Pjaxify the site
  $(document).pjax('a', '#bryan', { fragment: '#content' });
  $(document).on('pjax:end', function() {
    $('pre code').each(function(i, e) {
      hljs.highlightBlock(e);
    });
  });
});
