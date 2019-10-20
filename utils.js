export default function mockFetch (response) {
  const mockSuccessResponse = response;
  const mockJsonPromise = Promise.resolve(mockSuccessResponse);
  return Promise.resolve({
    json: () => mockJsonPromise,
  });
};
