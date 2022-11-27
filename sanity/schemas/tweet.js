export default {
  name: 'tweet',
  title: 'Tweet',
  type: 'document',
  fields: [
    {
      name: 'text',
      title: 'Text in the tweet',
      type: 'string',
    },
    
    {
      name: 'blockTweet',
      title: 'BlockTweet',
      description: 'Admin controls: Trigger for innapropriate tweet',
      type: 'boolean'
      
    },
    {
      name: 'username',
      title: 'Username',
      type: 'string',
    },
    {
      name: 'profileImage',
      title: 'Profile Image',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Tweet Image',
      type: 'string',
    },

  ],
  }

