declare namespace FFRKAPI {
  interface Base {
    id: number;
    description: string;
    imagePath: string;
    isInGlobal: boolean;
    isChecked: boolean;
    enlirId: string;
  }

  interface CharacterBase extends Base {
    characterName: string;
    characterId: number;
  }

  interface Command extends CharacterBase {
    sourceSoulBreakName: string;
    commandName: string;
    japaneseName: string;
    abilityType: number;
    targetType: number;
    autoTargetType: number;
    damageFormulaType: number;
    multiplier: number;
    elements: Array<number>;
    castTime: number;
    effects: string;
    isCounterable: boolean;
    soulBreakPointsGained: number;
    school: number;
  }

  interface SynchroCommand extends CharacterBase {
    sourceSoulBreakName: string;
    sourceSoulBreakId: number;
    synchroAbilitySlot: number;
    synchroCondition: string;
    synchroConditionId: number;
    commandName: string;
    japaneseName: string;
    abilityType: number;
    targetType: number;
    autoTargetType: number;
    damageFormulaType: number;
    elements: Array<number>;
    castTime: number;
    effects: string;
    isCounterable: boolean;
    soulBreakPointsGained: number;
    school: number;
  }

  interface LegendMateria extends CharacterBase {
    legendMateriaName: string;
    realm: number;
    tier: string;
    effect: string;
    masteryBonus: string;
    relicName: string;
    relicId: number;
    anima: string;
  }

  interface OrbRequirement {
    honeRank: number;
    orbName: string;
    orbId: number;
    orbCount: number;
  }

  interface Ability extends Base {
    abilityName: string;
    school: number;
    rarity: number;
    minUses: number;
    maxUses: number;
    abilityType: number;
    targetType: number;
    autoTargetType: number;
    damageFormulaType: number;
    multiplier: number;
    elements: Array<number>;
    castTime: number;
    effects: string;
    soulBreakPointsGained: number;
    introducingEventName: string;
    introducingEventId: number;
    japaneseName: string;
    orbRequirements: Array<OrbRequirement>;
  }

  interface Status {
    id: number;
    description: string;
    statusId: number;
    commonName: string;
    effects: string;
    defaultDuration: number;
    mindModifier: number;
    exclusiveStatuses: Array<string>;
    codedName: string;
    notes: string;
  }

  interface BraveAction extends CharacterBase {
    sourceSoulBreakName: string;
    sourceSoulBreakId: number;
    braveActionName: string;
    japaneseName: string;
    braveCondition: string;
    braveLevel: number;
    abilityType: number;
    targetType: number;
    autoTargetType: number;
    damageFormulaType: number;
    multiplier: number;
    elements: Array<number>;
    castTime: number;
    effects: string;
    isCounterable: boolean;
    soulBreakPointsGained: number;
    school: number;
  }

  interface OtherEffect extends Base {
    characterName: string; //no character ID
    sourceName: string;
    sourceType: string;
    sourceId: number;
    name: string;
    abilityType: number;
    targetType: number;
    damageFormulaType: number;
    multiplier: number;
    elements: Array<number>;
    castTime: number;
    effects: string;
    isCounterable: boolean;
    autoTargetType: number;
    soulBreakPointsGained: number;
    school: number;
  }

  interface SoulBreak extends CharacterBase {
    relicName: string;
    relicId: string;
    commands: Array<Command>;
    synchroCommands: Array<SynchroCommand>;
    braveActions: Array<BraveAction>;
    statuses: Array<Status>;
    otherEffects: Array<OtherEffect>;
    soulBreakName: string;
    japaneseName: string;
    abilityType: number;
    targetType: number;
    autoTargetType: number;
    damageFormulaType: number;
    multiplier: number;
    elements: Array<number>;
    castTime: number;
    effects: string;
    isCounterable: boolean;
    soulBreakPointsRequired: number;
    soulBreakTier: number;
    masteryBonus: string;
    anima: string;
  }

}

export default FFRKAPI;
