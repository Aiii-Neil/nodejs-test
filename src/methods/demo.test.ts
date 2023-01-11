import { demo } from './demo';

jest.mock('../services/firebase/get-us-firestore', () => {
  const mockFirestoreDoc = {
    get: jest.fn().mockReturnValue({
      get: jest.fn().mockReturnValue({}),
      data: () => ({}),
      exists: false
    })
  };

  const mockFirestoreCollection = {
    doc: jest.fn().mockReturnValue(mockFirestoreDoc)
  };

  const mGetFirestore = jest.fn(() => mockFirestoreCollection);
  return { getUsFirestore: mGetFirestore };
});

jest.mock('../services/firebase/get-tw-firestore', () => {
  const mockFirestoreDoc = {
    get: jest.fn().mockReturnValue({
      get: jest.fn().mockReturnValue({}),
      data: () => ({}),
      exists: false
    })
  };

  const mockFirestoreCollection = {
    doc: jest.fn().mockReturnValue(mockFirestoreDoc)
  };

  const mGetFirestore = jest.fn(() => mockFirestoreCollection);
  return { getTwFirestore: mGetFirestore };
});

describe('demo test', () => {
  beforeAll(() => {
    process.env.TW_FIREBASE_CERTIFICATE_PATH =
      process.env.TW_FIREBASE_CERTIFICATE_PATH ?? 'testFoo';
    jest.spyOn(console, 'log').mockImplementation(() => {}); // disable console.log in test
  });

  afterAll(() => {
    process.env.TW_FIREBASE_CERTIFICATE_PATH =
      process.env.TW_FIREBASE_CERTIFICATE_PATH === 'testFoo'
        ? undefined
        : process.env.TW_FIREBASE_CERTIFICATE_PATH;
    jest.restoreAllMocks();
  });

  it('should throw error when exportMode is empty', async () => {
    await expect(demo('' as any)).rejects.toThrowError(
      'exportMode is required'
    );
  });

  it('should throw error when exportMode is undefined', async () => {
    await expect(demo(undefined as any)).rejects.toThrowError(
      'exportMode is required'
    );
  });

  it('should throw error when exportMode is not one of [ all, us, tw ]', async () => {
    await expect(demo('notExist' as any)).rejects.toThrowError(
      'exportMode must be one of [ all, us, tw ]'
    );
  });

  it('should return all data', async () => {
    const result = await demo('all');
    expect(result).toHaveProperty('usData');
    expect(result).toHaveProperty('twData');
  });

  it('should return us data', async () => {
    const result = await demo('us');
    expect(result).toHaveProperty('usData');
    expect(result).not.toHaveProperty('twData');
  });

  it('should return tw data', async () => {
    const result = await demo('tw');
    expect(result).toHaveProperty('twData');
    expect(result).not.toHaveProperty('usData');
  });
});
