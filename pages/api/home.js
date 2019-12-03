import fetch from 'isomorphic-unfetch';
import admin from 'firebase-admin';

export default async (req, res) => {
  console.log('req body', await req.body);
  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else {
    console.log('No token found');
    console.log('req header', req.headers.authorization);
    return res.status(403).json({ error: 'Unauthorized' });
  }

  try {
    const someToken = admin.auth().verifyIdToken(idToken);
    console.log('server token', idToken);
    console.log('server decoded token', someToken);
    // const url = `https://api.github.com/user/${token}`;

    // if (response.ok) {
    //   const js = await response.json();
    //   // Need camelcase in the frontend
    //   const data = Object.assign({}, { avatarUrl: js.avatar_url }, js);
    //   return res.status(200).json({ data });
    // } else {
    //   // https://github.com/developit/unfetch#caveats
    //   const error = new Error(response.statusText);
    //   error.response = response;
    //   throw error;
    // }
  } catch (error) {
    const { response } = error;
    return response
      ? res.status(response.status).json({ message: response.statusText })
      : res.status(400).json({ message: error.message });
  }
};
