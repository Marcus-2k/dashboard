import { API_BASE_URL } from "../constants/api-base-url";

export class ProductService {
  private static readonly baseUrl = `${API_BASE_URL}/api/product`;

  static async getAllProducts() {
    const response = await fetch(this.baseUrl);

    return response.json();
  }

  static async createProduct(product: any) {}
}
