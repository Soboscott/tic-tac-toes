'use strict';
// sign-up copied from api-token-auth/scripts/sign-up.sh
#!/bin/bash

#curl "http://localhost:3000/sign-up"
curl "http://httpbin.org/post"
  --include
  --request POST
  --data-urlencode ""

# --header "Content-Type: application/x-www-form-urlencoded"


//sign-in copied from api-token-auth/scripts/sign-in.sh
#curl "http://localhost:3000/sign-in"
curl "http://httpbin.org/post"
  --include
  --request POST
  --data-urlencode ""

  //change-password copied from api-token-auth/scripts/change-password.sh
  #curl "http://localhost:3000/change-password/${ID}"
  curl "http://httpbin.org/patch?id=${ID}"
    --include
    --request PATCH
    --data-urlencode ""

    //sign-out copied from api-token-auth/scripts/sign-out.sh
    # curl "http://localhost:3000/sign-out/$ID" \
    curl "http://httpbin.org/delete?id=$ID" \
      --include \
      --request DELETE

# data output from curl doesn't have a trailing newline
echo
