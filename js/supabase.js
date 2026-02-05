// Mock de Supabase para desarrollo local
export const supabase = {
    from: (table) => ({
        select: (fields) => ({
            eq: (field, value) => ({
                single: async () => ({ data: null, error: null })
            })
        }),
        update: (data) => ({
            eq: (field, value) => Promise.resolve({ error: null })
        }),
        insert: (data) => Promise.resolve({ data: null, error: null }),
        upsert: (data) => Promise.resolve({ data: null, error: null })
    }),
    auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
        getSession: async () => ({ data: { session: { user: { id: 'mock-user-id' } } }, error: null }),
        signOut: async () => ({ error: null })
    }
};
