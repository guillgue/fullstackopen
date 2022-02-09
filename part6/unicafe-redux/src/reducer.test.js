import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  const someState = {
    good: 3,
    ok: 2,
    bad: 6
  }

  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = someState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 4,
      ok: 2,
      bad: 6
    })
  })

  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = someState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 3,
      ok: 2,
      bad: 7
    })
  })

  test('ok is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = someState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 3,
      ok: 3,
      bad: 6
    })
  })

  test('resets state', () => {
    const action = {
      type: 'ZERO'
    }
    const state = someState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual(initialState)
  })
})