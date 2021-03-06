import { expect } from 'chai';
import sinon from 'sinon';
import API from 'lib/api';
import ComponentMock from 'test/mocks/component';
import PageTypeTodosExampleModel from 'client/components/page/mods/type/todos-example/model';

let component = new ComponentMock();
let sandbox = sinon.sandbox.create();
let model;

describe('PageTypeTodosExample', () => {
  beforeEach(() => model = new PageTypeTodosExampleModel(component));

  afterEach(() => {
    model.destroy();
    sandbox.restore();
  });

  describe('#load()', () => {
    it('should set correct state after loading', () => {
      let data = {
        SEO: {
          title: 'Boilerplate • TodoMVC',
          description: 'Todo apps with Boilerplate'
        },
        Todos: { items: [] }
      };

      sandbox.stub(API, 'get').returns(Promise.resolve(data));

      return model.load()
        .then(() => expect(component.state).to.deep.equal(Object.assign({ isLoading: false }, data)));
    });
  });
});
