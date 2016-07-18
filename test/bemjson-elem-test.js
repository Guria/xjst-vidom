var test = require('./fixtures')().test;

describe('BEMJSON elem', function() {
  it('should assume elem=\'\' is a falsey value', function() {
    test(function() {
      block('b1').elem('e1').def()(function() {
        return applyCtx(this.extend(this.ctx, {
          block: 'b2',
          elem: ''
        }));
      });
    }, { block: 'b1' }, ['div', { className: 'b1' }]);
  });

  it('wildcard elem should be called before the matched templates',
    function() {
    test(function() {
      block('b1').content()(function() {
        return 'block';
      });
      block('b1').elem('a').content()(function() {
        return 'block-a';
      });
      block('b1').elem('*').content()(function() {
        return '%' + applyNext() + '%';
      });
    }, [ {
      block: 'b1'
    }, {
      block: 'b1',
      elem: 'a'
    }, {
      block: 'b3',
      elem: 'b',
      content: 'ok'
    } ], ['div', null,
            ['div', { className: 'b1' }, 'block'],
            ['div', { className: 'b1__a'}, '%block-a%'],
            ['div', { className: 'b3__b'}, '%ok%']]);
  });
});
