import { config } from "../config";
import { Config } from "../types/config.type";

export async function get(): Promise<Config> {
  return config;
}
