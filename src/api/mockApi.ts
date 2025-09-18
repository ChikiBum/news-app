import type { User, Users } from "../types";

const mockUsers: Users = [
	{
		id: 1,
		username: "john_doe",
		name: "John Doe",
		email: "john@example.com",
		password: "12345",
	},
	{
		id: 2,
		username: "jane_smith",
    name: "Jane Smith",
		email: "jane@example.com",
		password: "67890",
	},
  {
		id: 3,
		username: "111",
		name: "John Doe",
		email: "john@example.com",
		password: "111",
	},
];

export const fetchUser = async (userId: number): Promise<User> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const user: User = mockUsers.filter((u) => u.id === userId)[0];
			if (user) {
				resolve(user);
			} else {
				throw new Error("User not found");
			}
		}, 1000); 
	});
};

export const login = async (credentials: { username: string; password: string }): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find(u => u.username === credentials.username && u.password === credentials.password);
      if (user) {
        resolve(user);
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 1000);
  });
};

export const register = async (userData: Omit<User, 'id'>): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exists = mockUsers.some(u => u.email === userData.email);
      if (exists) {
        reject(new Error("User already exists"));
      } else {
        const newUser = { ...userData, id: mockUsers.length + 1 };
        mockUsers.push(newUser);
        resolve(newUser);
      }
    }, 1000);
  });
};
