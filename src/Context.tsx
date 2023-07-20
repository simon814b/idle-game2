import React, { ReactNode, createContext } from 'react';

enum Upgrade {
    DoubleBeachSpeed,
    UnlockForestZone,
    DoubleForestSpeed,
    UnlockMountainZone, 
    DoubleMountainSpeed
}

export enum Zone {
    Beach,
    Forest,
    Mountain
}

type globalContext = {
    gold: number,
    updateGold: (r1: number) => void,
    upgrades: Upgrade[],
    unlockUpgrade: (r1: Upgrade) => void,
    zoneLevels: Map<Zone, number>,
    upgradeZone: (r1: Zone) => void
}

const globalContextDefaultValue: globalContext = {
    gold: 0,
    updateGold: (r1: number) => {},
    upgrades: [],
    unlockUpgrade: (r1: Upgrade) => {},
    zoneLevels: new Map<Zone, number>([[Zone.Beach, 1], [Zone.Forest, 0], [Zone.Mountain, 0]] ),
    upgradeZone: (r1: Zone) => {}
}

const GlobalContext = createContext(globalContextDefaultValue)

type IProps = {
    children: ReactNode
}
const Provider = ({ children }: IProps) => {
    const [gold, setGold] = React.useState(globalContextDefaultValue.gold)
    const [upgrades, setUpgrades] = React.useState(globalContextDefaultValue.upgrades)
    const [zoneLevels, setZoneLevels] = React.useState(globalContextDefaultValue.zoneLevels)
    const updateGold = (amount: number) => {
        if (gold+amount >= 0) {
            setGold(gold+amount)
        }
    }
    const unlockUpgrade = (upg: Upgrade) => {
        let tempUpgrades = upgrades
        if (!tempUpgrades.find((val:Upgrade)=>val===upg)) {
            tempUpgrades.push(upg)
            setUpgrades(tempUpgrades)
        }
    }
    const upgradeZone = (zone: Zone) => {
        const zoneLevel = zoneLevels.get(zone)
        if (!zoneLevel) {
            setZoneLevels(zoneLevels.set(zone, 1))
        } else {
            setZoneLevels(zoneLevels.set(zone, zoneLevel+1))
        }
    }
    const globalContextValue: globalContext = {
        gold: gold,
        updateGold: updateGold,
        upgrades: upgrades,
        unlockUpgrade: unlockUpgrade,
        zoneLevels: zoneLevels,
        upgradeZone: upgradeZone,
    }
    return <GlobalContext.Provider value={globalContextValue}>
        {children}
    </GlobalContext.Provider>
}

export { Provider as GlobalProvider }
export { GlobalContext }