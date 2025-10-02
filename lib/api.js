// API utility functions for connecting to the backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3012/api';

// Generic API call function with timeout and retry
async function apiCall(endpoint, options = {}, retries = 2) {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    // Add timeout to prevent long waits
    signal: AbortSignal.timeout(2000), // 2 second timeout
  };

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`API call failed (attempt ${attempt + 1}/${retries + 1}):`, error);
      
      // If this is the last attempt, return error
      if (attempt === retries) {
        return { data: [], error: error.message };
      }
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }
}

// Properties API
export const propertiesAPI = {
  // Get all properties with optional filters
  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value);
      }
    });
    
    const queryString = queryParams.toString();
    const endpoint = queryString ? `/properties?${queryString}` : '/properties';
    
    return apiCall(endpoint);
  },

  // Get single property by ID
  getById: async (id) => {
    return apiCall(`/properties/${id}`);
  },

  // Get dropdown data for property forms
  getDropdownData: async () => {
    return apiCall('/properties/dropdown-data');
  },

  // Get property statistics
  getStats: async () => {
    return apiCall('/properties/stats/summary');
  }
};

// Builders API
export const buildersAPI = {
  // Get all builders
  getAll: async () => {
    return apiCall('/builders');
  },

  // Get single builder by slug
  getBySlug: async (slug) => {
    return apiCall(`/builders/${slug}`);
  },

  // Create new builder
  create: async (builderData) => {
    return apiCall('/builders', {
      method: 'POST',
      body: JSON.stringify(builderData),
    });
  },

  // Update builder
  update: async (id, builderData) => {
    return apiCall(`/builders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(builderData),
    });
  },

  // Delete builder
  delete: async (id) => {
    return apiCall(`/builders/${id}`, {
      method: 'DELETE',
    });
  }
};

// Cities API
export const citiesAPI = {
  // Get all cities
  getAll: async () => {
    return apiCall('/cities');
  },

  // Get single city by ID
  getById: async (id) => {
    return apiCall(`/cities/${id}`);
  },

  // Create new city
  create: async (cityData) => {
    return apiCall('/cities', {
      method: 'POST',
      body: JSON.stringify(cityData),
    });
  },

  // Update city
  update: async (id, cityData) => {
    return apiCall(`/cities/${id}`, {
      method: 'PUT',
      body: JSON.stringify(cityData),
    });
  },

  // Delete city
  delete: async (id) => {
    return apiCall(`/cities/${id}`, {
      method: 'DELETE',
    });
  }
};

// Categories API
export const categoriesAPI = {
  // Get all categories
  getAll: async () => {
    return apiCall('/categories');
  },

  // Get single category by ID
  getById: async (id) => {
    return apiCall(`/categories/${id}`);
  },

  // Create new category
  create: async (categoryData) => {
    return apiCall('/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData),
    });
  },

  // Update category
  update: async (id, categoryData) => {
    return apiCall(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(categoryData),
    });
  },

  // Delete category
  delete: async (id) => {
    return apiCall(`/categories/${id}`, {
      method: 'DELETE',
    });
  }
};

// Upload API
export const uploadAPI = {
  // Upload single image
  uploadSingle: async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    
    return apiCall('/upload/single', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    });
  },

  // Upload multiple images
  uploadMultiple: async (files) => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file);
    });
    
    return apiCall('/upload/multiple', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    });
  },

  // Upload builder images (logo + background)
  uploadBuilder: async (logoFile, backgroundFile) => {
    const formData = new FormData();
    if (logoFile) formData.append('logo', logoFile);
    if (backgroundFile) formData.append('backgroundImage', backgroundFile);
    
    return apiCall('/upload/builder', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    });
  }
};

export default {
  properties: propertiesAPI,
  builders: buildersAPI,
  cities: citiesAPI,
  categories: categoriesAPI,
  upload: uploadAPI,
};
