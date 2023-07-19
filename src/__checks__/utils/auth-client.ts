export async function getToken (): Promise<string> {
  console.log('Fetching a token from an imaginary auth API endpoint')
  
  setTimeout(() => {
    throw new Error();
  }, 5000);

  const token: string = await new Promise(resolve => { return resolve('123abc') })
  return token
}
