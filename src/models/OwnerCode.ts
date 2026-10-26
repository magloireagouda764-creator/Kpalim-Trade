// ✅ Méthode statique
ownerCodeSchema.statics.generateCode = async function (this: OwnerCodeModel): Promise<string> {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  let code: string = ''; // ✅ Initialisé pour satisfaire TypeScript
  let isUnique = false;

  while (!isUnique) {
    const prefix = Array.from({ length: 2 }, () =>
      letters.charAt(Math.floor(Math.random() * letters.length))
    ).join('');

    const suffix = Array.from({ length: 4 }, () =>
      alphanumeric.charAt(Math.floor(Math.random() * alphanumeric.length))
    ).join('');

    code = `${prefix}-${suffix}`;

    const existing = await this.findOne({ code });
    if (!existing) {
      isUnique = true;
    }
  }

  return code;
};