import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import { ApolloConsumer } from 'react-apollo'
import Signup, { SIGNUP_MUTATION } from '../components/RequestReset';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser } from '../lib/testUtils';

function type(type, name, value){
  wrapper.find(`input[name="${name}"]`).simulate('change', {
    target: { name, value},
  });
}

const me = fakeUser();
const mocks = [
  {
    request: {
      query: SIGNUP_MUTATION,
      variables: {
        email: me.email,
        name: me.name,
        password: 'test',
      },
    },
    result: {
      data: {
        signup: {
          __typename: 'User',
          id: 'abc123',
          email: me.email,
          name: me.name,
        },
      },
    },
  },
  //cuyrrent user mock
  {
    request: { query: CURRENT_USER_QUERY},
    result: { data: { me }},
  },
];

describe('<Signup />', () => {
  it('renders and matches snapshot', async () => {
    const wrapper = mount(<MockedProvider><Signup /></MockedProvider>
    );
    expect(toJSON(wrapper.find('form'))).toMatchSnapshot();
  });
  it('calls the mutation properly', async () => {
    let apolloClient;
    const wrapper = mount(<MockedProvider mocks={mocks}>
      <ApolloConsumer>
        {client => {
          apolloClient = client;
          return <Signup />;
        }}
      </ApolloConsumer>
    </MockedProvider>
    )
    await wait();
    wrapper.update();
    console.log(apolloClient);
  })
})
