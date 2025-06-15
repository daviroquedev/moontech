import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Exportamos o tipo User para que outros componentes possam usá-lo
export interface User {
  _id: string;
  nombre: string;
  email: string;
  activo: boolean;
  // A senha não é incluída aqui, pois nunca devemos manipulá-la no frontend
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // O caminho para a nossa API de usuários. O proxy cuidará do redirecionamento.
  private apiUrl = '/api/users';

  constructor(private http: HttpClient) { }

  /**
   * Obtém a lista de todos os usuários do backend.
   * @returns Um Observable com um array de usuários.
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  /**
   * Cria um novo usuário.
   * @param user Os dados do novo usuário (nome, email, senha).
   * @returns Um Observable com o usuário recém-criado.
   */
  createUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  /**
   * Atualiza um usuário existente.
   * @param id O ID do usuário a ser atualizado.
   * @param user Os novos dados para o usuário.
   * @returns Um Observable com o usuário atualizado.
   */
  updateUser(id: string, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  /**
   * Deleta um usuário.
   * @param id O ID do usuário a ser deletado.
   * @returns Um Observable vazio após a conclusão.
   */
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
