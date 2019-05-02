import nunjucks from 'nunjucks';

nunjucks.configure('./templates/src/common/templates', { autoescape: false });

export default nunjucks;
