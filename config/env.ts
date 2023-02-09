import { Spec, ValidatorSpec, bool, cleanEnv, email, num, str, url } from 'envalid'

const isServer = typeof window === 'undefined'

type EnvKey = keyof typeof envVars

const optionalVarOpts: Spec<string> = { default: undefined }
const serverVarOpts = isServer ? undefined : optionalVarOpts

const envVars = {
  CODEGEN_OUTPUT_FILE: process.env.CODEGEN_OUTPUT_FILE,
  QUIXOTIC_API_TOKEN: process.env.QUIXOTIC_API_TOKEN,
  STRATOS_API_TOKEN: process.env.STRATOS_API_TOKEN,
  SIMPLEHASH_API_KEY: process.env.SIMPLEHASH_API_KEY,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
  NEXT_PUBLIC_EMAIL_CONTACT: process.env.NEXT_PUBLIC_EMAIL_CONTACT,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_REACT_APP_DEFAULT_CHAIN_ID: process.env.NEXT_PUBLIC_REACT_APP_DEFAULT_CHAIN_ID,
  NEXT_PUBLIC_MAINNET_TOKEN_PROVIDER: process.env.NEXT_PUBLIC_MAINNET_TOKEN_PROVIDER,
  NEXT_PUBLIC_ARBITRUM_TOKEN_PROVIDER: process.env.NEXT_PUBLIC_ARBITRUM_TOKEN_PROVIDER,
  NEXT_PUBLIC_POLYGON_TOKEN_PROVIDER: process.env.NEXT_PUBLIC_POLYGON_TOKEN_PROVIDER,
  NEXT_PUBLIC_OPTIMISM_TOKEN_PROVIDER: process.env.NEXT_PUBLIC_OPTIMISM_TOKEN_PROVIDER,
  NEXT_PUBLIC_GOERLI_TOKEN_PROVIDER: process.env.NEXT_PUBLIC_GOERLI_TOKEN_PROVIDER,
  NEXT_PUBLIC_WEB3_STORAGE_TOKEN_KEY: process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN_KEY,
  NEXT_PUBLIC_GRAPH_ENDPOINT_MAINNET: process.env.NEXT_PUBLIC_GRAPH_ENDPOINT_MAINNET,
  NEXT_PUBLIC_GRAPH_ENDPOINT_OPTIMISM: process.env.NEXT_PUBLIC_GRAPH_ENDPOINT_OPTIMISM,
  NEXT_PUBLIC_GRAPH_ENDPOINT_GOERLI: process.env.NEXT_PUBLIC_GRAPH_ENDPOINT_GOERLI,
  NEXT_PUBLIC_GRAPH_ENDPOINT_ARBITRUM: process.env.NEXT_PUBLIC_GRAPH_ENDPOINT_ARBITRUM,
  NEXT_PUBLIC_GRAPH_ENDPOINT_POLYGON: process.env.NEXT_PUBLIC_GRAPH_ENDPOINT_POLYGON,
  NEXT_PUBLIC_IPFS_GATEWAY_BASE_URL: process.env.NEXT_PUBLIC_IPFS_GATEWAY_BASE_URL,
  NEXT_PUBLIC_MAINTENANCE_MODE: process.env.NEXT_PUBLIC_MAINTENANCE_MODE,
  NEXT_PUBLIC_MAINTENANCE_MESSAGE_TITLE: process.env.NEXT_PUBLIC_MAINTENANCE_MESSAGE_TITLE,
  NEXT_PUBLIC_MAINTENANCE_MESSAGE_SUBTITLE: process.env.NEXT_PUBLIC_MAINTENANCE_MESSAGE_SUBTITLE,
  NEXT_PUBLIC_AELIN_VOUCHER_ENS_ADDRESS: process.env.NEXT_PUBLIC_AELIN_VOUCHER_ENS_ADDRESS,
}

const envConfig: Record<EnvKey, ValidatorSpec<string | number | boolean>> = {
  CODEGEN_OUTPUT_FILE: str(serverVarOpts),
  QUIXOTIC_API_TOKEN: str(serverVarOpts),
  STRATOS_API_TOKEN: str(serverVarOpts),
  SIMPLEHASH_API_KEY: str(serverVarOpts),
  NEXT_PUBLIC_APP_NAME: str(),
  NEXT_PUBLIC_APP_ENV: str({ choices: ['development', 'staging', 'production'] }),
  NEXT_PUBLIC_EMAIL_CONTACT: email(),
  NEXT_PUBLIC_APP_URL: url(),
  NEXT_PUBLIC_REACT_APP_DEFAULT_CHAIN_ID: num(),
  NEXT_PUBLIC_MAINNET_TOKEN_PROVIDER: str(),
  NEXT_PUBLIC_ARBITRUM_TOKEN_PROVIDER: str(),
  NEXT_PUBLIC_POLYGON_TOKEN_PROVIDER: str(),
  NEXT_PUBLIC_OPTIMISM_TOKEN_PROVIDER: str(),
  NEXT_PUBLIC_GOERLI_TOKEN_PROVIDER: str(),
  NEXT_PUBLIC_WEB3_STORAGE_TOKEN_KEY: str(),
  NEXT_PUBLIC_GRAPH_ENDPOINT_MAINNET: url(),
  NEXT_PUBLIC_GRAPH_ENDPOINT_OPTIMISM: url(),
  NEXT_PUBLIC_GRAPH_ENDPOINT_GOERLI: url(),
  NEXT_PUBLIC_GRAPH_ENDPOINT_ARBITRUM: url(),
  NEXT_PUBLIC_GRAPH_ENDPOINT_POLYGON: url(),
  NEXT_PUBLIC_IPFS_GATEWAY_BASE_URL: url(),
  NEXT_PUBLIC_MAINTENANCE_MODE: bool(),
  NEXT_PUBLIC_MAINTENANCE_MESSAGE_TITLE: str(),
  NEXT_PUBLIC_MAINTENANCE_MESSAGE_SUBTITLE: str(),
  NEXT_PUBLIC_AELIN_VOUCHER_ENS_ADDRESS: str(),
}

const env = cleanEnv(envVars, envConfig)

export default env
