

import dynamic from 'next/dynamic'

const LoginPage = dynamic(() =>
  import('ui/pages/login/LoginPage').then((mod) => mod.default)
)

export default LoginPage;

