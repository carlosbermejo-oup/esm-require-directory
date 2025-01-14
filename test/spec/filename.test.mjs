import path from 'path';
import url from 'url';
import chai, { expect } from 'chai';
import size from 'lodash.size';

import importDirectory from '../../index.mjs';

const { assert } = chai;
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data', 'directory');

describe('filename', () => {
  describe('paths: true', () => {
    it('filename: (default), recursive: true', async () => {
      const results = await importDirectory(DATA_DIR, {
        paths: true,
        recursive: true,
      });
      assert.ok(!Array.isArray(results));
      assert.equal(size(results), 15);
      Object.entries(results).forEach(([name]) => {
        assert.equal(path.extname(name), '');
      });
    });

    it('filename: true, recursive: true', async () => {
      const results = await importDirectory(DATA_DIR, {
        filename: true,
        paths: true,
        recursive: true,
      });
      assert.ok(!Array.isArray(results));
      assert.equal(size(results), 15);
      Object.entries(results).forEach(([name]) => {
        assert.equal(path.extname(name), '');
      });
    });

    it('filename: false, recursive: true', async () => {
      const results = await importDirectory(DATA_DIR, {
        filename: false,
        paths: true,
        recursive: true,
      });
      assert.ok(!Array.isArray(results));
      assert.equal(size(results), 15);
      Object.entries(results).forEach(([name]) => {
        expect(['.mjs', '.js']).to.include(path.extname(name));
      });
    });
  });

  describe('paths: false', () => {
    it('filename: (default), recursive: true', async () => {
      const results = await importDirectory(DATA_DIR, {
        paths: false,
        recursive: true,
      });
      assert.ok(Array.isArray(results));
      assert.equal(size(results), 15);
    });

    it('filename: true, recursive: false', async () => {
      const results = await importDirectory(DATA_DIR, {
        filename: true,
        paths: false,
        recursive: false,
      });
      assert.ok(!Array.isArray(results));
      assert.equal(size(results), 3);
      Object.entries(results).forEach(([name, value]) => {
        assert.ok(!Array.isArray(value));
        assert.equal(path.extname(name), '');
      });
    });

    it('filename: true, recursive: true', async () => {
      const results = await importDirectory(DATA_DIR, {
        filename: true,
        paths: false,
        recursive: true,
      });
      assert.ok(!Array.isArray(results));
      assert.equal(size(results), 3);
      Object.entries(results).forEach(([name, value]) => {
        assert.equal(value.length, 5);
        assert.equal(path.extname(name), '');
      });
    });

    it('filename: false, recursive: true', async () => {
      const results = await importDirectory(DATA_DIR, {
        filename: false,
        paths: false,
        recursive: true,
      });
      assert.ok(Array.isArray(results));
      assert.equal(size(results), 15);
    });
  });
});
