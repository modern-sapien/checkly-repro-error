export async function getToken (): Promise<string> {
  console.log('Fetching a token from an imaginary auth API endpoint')
  
  await new Promise(resolve => setTimeout(resolve, 15000));
  console.log(new Date().toISOString())

  const token: string = await new Promise(resolve => { return resolve('123abc') })
  return token
}

