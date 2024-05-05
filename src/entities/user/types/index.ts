interface UserData {
  firstname: string;
  middlename: string | null;
  lastname: string;
  phone: string;
}

interface Component {
  name: string;
  route: string;
}

interface Permission {
  name: string;
  methods: string[];
}

interface Group {
  id: number;
  name: string;
}

interface User {
  access_token: string;
  user: UserData;
  components: Component[];
  permissions: Permission[];
  group: Group;
}
