import React from 'react'
import UsersList from '../components/UsersList'
function Users() {
    const USERS = [{
        id: 'u1',
        name: 'Spider Ham',
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvignette.wikia.nocookie.net%2Fpoohadventures%2Fimages%2F4%2F49%2FPeter_Porker.png%2Frevision%2Flatest%2Fscale-to-width-down%2F2000%3Fcb%3D20200710234628&f=1&nofb=1&ipt=33a3a06d0191a1f75a5285f51d5bff094a0ef1b8a31f1bc423ad36f0a9b1d6e4&ipo=images',
        places: 5,
    }];

//we pass items property with a handler that will contain DB. This prop will be extracted down the totem pole. INTERESTINGLY, we are only passing an object and not a function.
  return (
      <UsersList items={USERS} />
  )
}

export default Users